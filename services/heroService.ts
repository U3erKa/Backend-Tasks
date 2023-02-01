import createHttpError from 'http-errors';
import { Image, SuperPower } from '../models';

export async function addSuperPowers({ superPowers, transaction, hero }) {
  if (superPowers?.length) {
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

    const newPowers = newPowersList.map((superPower) => ({ superPower }));

    await SuperPower.bulkCreate(newPowers, { transaction, validate: true });
    await hero.addSuperPowers(oldPowersList, {
      transaction,
      validate: true,
    });

    return superPowers;
  }
}
export async function addImages({ files, hero, transaction }) {
  if (files?.length) {
    if (!(files instanceof Array)) {
      throw createHttpError(400, `"files" field must be an array: ${typeof files}`);
    }

    const imagesPaths = files.map((file) => ({ path: file.filename, heroId: hero.id }));
    await Image.bulkCreate(imagesPaths, { transaction, validate: true });

    return imagesPaths.map((image) => image.path);
  }
}
