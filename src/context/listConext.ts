import { createContext } from 'react';
import { IListContext, IListsEntity } from '../models/board-models';

const defaultValue: IListContext = {
    lists: {},
    setLists: (lists: IListsEntity) => {}
};

export const ListContext = createContext<IListContext>(defaultValue);
