import createHttpError from 'http-errors';
import { Op } from 'sequelize';

import { SuperPower } from '../models';
import { createPowers } from '../services/powerService';
import type { RequestHandler } from 'express';

export const createSuperPower: RequestHandler = async (req, res, next) => {
  const { body } = req;

  try {
    const [newPowersList] = await createPowers({ superPowers: body, uniqueOnly: true });
    const newPowers = await SuperPower.findAll({
      where: { superPower: { [Op.in]: newPowersList } },
    });

    res.status(201).send({ data: newPowers });
  } catch (error) {
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
      throw createHttpError(404, `Superpower not found: ${powerId}`);
    }
    res.send({ data: superPower });
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
      throw createHttpError(404, `Superpower not found: ${powerId}`);
    }
    res.send({ data: updatedPower });
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
      throw createHttpError(404, `Superpower not found: ${powerId}`);
    }
    res.send({ data: powerId });
  } catch (error) {
    next(error);
  }
};
