import { Injectable } from '@nestjs/common';
import { RedisService as IORedisService } from 'nestjs-redis';
import * as Redis from 'ioredis';

@Injectable()
export class RedisService {
  /**
   * this prop define ten minutes range that's used for expiration
   * @readonly
   * @private
   * @type {number}
   */
  private readonly tenMinutesInSeconds = 60 * 10;
  /**
   * property that define the redis client
   * @type {Redis.Redis}
   * @private
   */
  private client: Redis.Redis;

  /**
   *
   * @param {IORedisService} redisService
   */
  constructor(redisService: IORedisService) {
    this.client = redisService.getClient();
  }

  /**
   * add key for captcha validation
   * @param {string} key also known as uuid
   * @param {string} value also known as chapta solution
   * @async
   * @return {void}
   */
  async addKey(key: string, value: string): Promise<void> {
    await this.client.set(key, value, 'EX', this.tenMinutesInSeconds);
  }

  /**
   * get key for captcha validation (get solution)
   * @param {string} key also known as uuid
   * @async
   * @return {void}
   */
  async getKey(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  /**
   * delete key for given uuid
   * @param {string} key also known as uuid
   * @async
   * @return {void}
   */
  async delKey(key: string): Promise<void> {
    await this.client.del([key]);
  }
}
