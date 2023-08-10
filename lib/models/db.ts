import { Block } from '@blocknote/core';
import Dexie, { Table } from 'dexie';

export interface PageInfo {
  // page id
  id: string;
  parentId: string;
  properties: {
    title: string;
    icon: string;
    cover: string;
  }
  // page title
  editable: boolean;
  // blocks
  blocks: BlockNoteEditor['topLevelBlocks']
}

export class FlyDB extends Dexie {
  public pageInfo!: Table<PageInfo>;
  constructor() {
    super('flyDb');
    this.version(1).stores({
      pageInfo: '&id, properties.title, properties.icon, properties.cover  parentId, editable, *blocks'
    });
  }
}

export const db = new FlyDB();

export function resetDatabase() {
  return db.transaction('rw', db.pageInfo, async () => {
    await Promise.all(db.tables.map(table => table.clear()));
  });
}