import createHttpError from 'http-errors';

import { SuperPower } from '../models';
import type { AddPowersToHeroParams, CreatePowersParams } from '../types';


export async function addPowersToHero({ superPowers, transaction, hero }: AddPowersToHeroParams) {
  if (superPowers?.length) {
    const [, oldPowersList] = await createPowers({ superPowers, transaction });
    await hero.addSuperPowers(oldPowersList, {
      transaction,
      validate: true,
    });

    return superPowers;
  }
}

export async function createPowers({
  superPowers, transaction, uniqueOnly = false,
}: CreatePowersParams) {
  if (!(superPowers instanceof Array)) {
    throw createHttpError(400, `"superPowers" must be array of strings: ${typeof superPowers}`);
  }
  const newPowersList: string[] = [];
  const oldPowersList: number[] = [];

  const existingPowers = await SuperPower.findAll({
    attributes: ['superPower', 'id'],
    transaction,
  });
  const powers = existingPowers.map(({ dataValues }) => dataValues.superPower);
  const ids = existingPowers.map(({ dataValues }) => dataValues.id);

  for (let i = 0; i < superPowers.length; i++) {
    const newPower = superPowers[i];
    powers.includes(newPower)
      ? oldPowersList.push(ids[powers.indexOf(newPower)])
      : newPowersList.push(newPower);
  }
  if (uniqueOnly && oldPowersList.length) {
    throw createHttpError(400, `All superPowers must be unique: ${oldPowersList.length}`);
  }

  const newPowers = newPowersList.map((superPower) => ({ superPower }));

  await SuperPower.bulkCreate(newPowers, { transaction, validate: true });
  return [newPowersList, oldPowersList];
}
