import { Injectable } from '@nestjs/common';
import { CaptchaCanvasDesign } from './classes/captcha-canvas-design.class';
import { CaptchaGenerationResponse } from '../../interfaces/captcha-generation-response.interface';
import { v4 } from 'uuid';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class CreationService {
  /**
   * private property that set the default canvas width
   * @private
   */
  private readonly defaultCanvasWidth = 150;

  /**
   * private property that set the default canvas height
   * @private
   */
  private readonly defaultCanvasHeight = 30;

  /**
   * private property that set the default captcha word length
   * @private
   */
  private readonly defaultLength = 5;

  /**
   *
   * @param {RedisService} redisService injection of redis services
   */
  constructor(private readonly redisService: RedisService) {}

  /**
   * this method generate the captcha
   * @param {number} height params for modify height of png
   * @param {number} width params for modify width of png
   * @returns {CaptchaGenerationResponse} The generated captcha image with uuid
   * @async
   */
  async generate(
    height = this.defaultCanvasHeight,
    width = this.defaultCanvasWidth,
  ): Promise<CaptchaGenerationResponse> {
    const text = this.generateString();
    const uuid = v4();
    await this.saveKeyPairOnRedis(text, uuid);
    return {
      captcha: new CaptchaCanvasDesign(height, width).generateForDataUrl(text),
      uuid,
    };
  }

  /**
   * this is a private method used for creating a random string used in chapta
   * @param {number} length this param can modify the length of generated string
   * @returns {string} return the captcha string
   * @private
   */
  private generateString(length = this.defaultLength): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
  }

  /**
   *
   * @param {string} str is the random string used in chapta
   * @param {string} uuid uuid of current chapta
   * @returns {void}
   * @private
   * @async
   */
  private async saveKeyPairOnRedis(str: string, uuid: string): Promise<void> {
    const client = await this.redisService.getClient();
    const tenMinutes = 60 * 10;
    await client.set(uuid, str, 'EX', tenMinutes);
  }
}
