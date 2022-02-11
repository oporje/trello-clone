export interface ICard {
    title: string;
    description: string;
    cardId: string;
    listId?: string;
    boardId?: string;
}

export interface IListContext {
    lists: IListsEntity,
    setLists: (lists: IListsEntity) => void;
}

export interface ICardsEntity {
    [cardId: string]: ICard;
}

export interface IList {
    name: string;
    cards: ICardsEntity;
    boardId: string;
    listId: string;
}

export interface IListsEntity {
    [listId: string]: IList;
}
export interface IBoard {
    name: string;
    boardId: string
}
