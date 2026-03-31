import { Direction } from "src/domain/Direction";

export default interface TerrainPort {
  bounce(
    position: { x: number; y: number },
    direction: Direction
  ): { x: number; y: number; direction: Direction };
}
