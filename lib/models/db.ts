import { Block, BlockNoteEditor } from '@blocknote/core';
import Dexie, { Table } from 'dexie';

export interface PageInfo {
  // page id
  id: string; 
  // page title
  title: string;
  icon: string;
  cover: string;
  editable: boolean;
  // blocks
  blocks: BlockNoteEditor['topLevelBlocks']
}

export class FlyDB extends Dexie {
  public pageInfo!: Table<PageInfo>;
  constructor() {
    super('flyDb');
    this.version(1).stores({
      pageInfo: 'id, title, icon, cover, editable, blocks'
    });
  }
}

export const db = new FlyDB();

export function resetDatabase() {
  return db.transaction('rw', db.pageInfo, async () => {
    await Promise.all(db.tables.map(table => table.clear()));
  });
}