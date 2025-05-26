export interface INinjaService {
  swordAttack(): AttackType;
  starAttack(): AttackType;
  kickAttack(): AttackType;
}

export type AttackType = {
  damage: number;
};
