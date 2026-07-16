/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum ActiveScreen {
  CAKE = "CAKE",
  GIFT = "GIFT",
  CARD = "CARD"
}

export interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}
