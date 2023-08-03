import { nanoid } from 'nanoid';
import { IBlock } from '../types';

export const createBlock = (id: null | number): IBlock => ({ keyId: nanoid(), id });
