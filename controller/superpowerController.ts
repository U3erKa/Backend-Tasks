import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { SuperPower } from '../models';

export const createSuperPower: RequestHandler = async (req, res, next) => {
  const { body } = req;

  try {
    const powers = Array.isArray(body)
      ? body.map((power: string) => ({ superPower: power }))
      : null;

    if (!powers) {
      throw TypeError('Request body must be array of strings');
    }
    const superPowers = await SuperPower.bulkCreate(powers);

    res.status(201).send({ data: superPowers });
  } catch (error) {
    console.log(error.message);
    // res.status(500).send(error.message)
    next(error);
  }
};

export const getSuperPowers: RequestHandler = async (req, res, next) => {
  try {
    const superPowers = await SuperPower.findAll();
    res.send({ data: superPowers });
  } catch (error) {
    next(error);
  }
};

export const getSuperPower: RequestHandler = async (req, res, next) => {
  const {
    params: { powerId },
  } = req;

  try {
    const superPower = await SuperPower.findByPk(powerId);

    if (!superPower) {
      throw createHttpError(404, 'Superpower not found');
    }
    res.send(superPower);
  } catch (error) {
    next(error);
  }
};

export const updateSuperPower: RequestHandler = async (req, res, next) => {
  const {
    params: { powerId },
    body,
  } = req;

  try {
    const [updatedPowersCount, [updatedPower]] = await SuperPower.update(body, {
      where: { id: powerId },
      returning: true,
    });

    if (updatedPowersCount === 0) {
      throw createHttpError(404, 'Superpower not found');
    }
    res.send(updatedPower);
  } catch (error) {
    next(error);
  }
};

export const deleteSuperPower: RequestHandler = async (req, res, next) => {
  const {
    params: { powerId },
  } = req;

  try {
    const deletedPowersCount = await SuperPower.destroy({ where: { id: powerId } });

    if (deletedPowersCount === 0) {
      throw createHttpError(404, 'Superpower not found');
    }
    res.send({ data: powerId });
  } catch (error) {
    next(error);
  }
};
