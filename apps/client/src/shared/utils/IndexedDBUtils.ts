import { IndexedDBBookType } from "../types"

export class IndexedDB {
  static readonly #DATABASE_NAME: string = "ink_spell"
  static readonly #VERSION: number = 1
  static readonly #BOOK_CONTENT: string = "book_content"
  static readonly #BOOK_CONTENT_INDEX: string = "book_content_index"
  static readonly #SAVE_TIMER: number = 1000 * 60 * 60 * 24 * 15

  static db: IDBDatabase | undefined = undefined;
  static db_table: IDBObjectStore | undefined = undefined
  static store: IDBObjectStore | undefined = undefined

  static async ensureDBAndStore() {
    if (!this.db) {
      await this.openDB();
    }
    if (!this.store) {
      const transaction = await this.db?.transaction([this.#BOOK_CONTENT], 'readwrite')
      this.store = transaction?.objectStore(this.#BOOK_CONTENT);
    }
  }

  /**
   * @description 打开数据库
   * ```ts
   * IndexedDB.openDB()
   * ```
   */
  static openDB() {
    return new Promise<void>((resolve, reject) => {
      let request = window.indexedDB.open(this.#DATABASE_NAME, this.#VERSION);
      // 数据仓库打开失败
      request.onerror = (error) => { reject(error) }

      // 数据仓库打开成功
      request.onsuccess = (res) => {
        if (res.target instanceof IDBOpenDBRequest) {
          this.db = res.target.result;
          resolve()
        }
      };

      // 数据仓库升级事件(第一次新建库是也会触发，因为数据仓库从无到有算是升级了一次)
      request.onupgradeneeded = (res) => {
        if (res.target instanceof IDBOpenDBRequest) {
          this.db = res.target.result;
          resolve()
        }
        this.db_table = IndexedDB.db?.createObjectStore(this.#BOOK_CONTENT, { keyPath: 'id' });
        this.db_table?.createIndex(this.#BOOK_CONTENT_INDEX, 'createTimer', { unique: false });
      };
    })
  }

  /**
   * @description  添加数据
   * ```ts
   * IndexedDB.add()
   * ```
   */
  static async add(data: any): Promise<void> {
    await this.ensureDBAndStore()

    return new Promise<void>(async (resolve, reject) => {
      let request = this.store?.add({
        ...data,
        createTimer: new Date().valueOf() + this.#SAVE_TIMER
      })
      if (request) {
        request.onsuccess = (event) => {
          if (event.target instanceof IDBRequest) {
            resolve(event.target.result)
          } else {
            reject()
          }
        }
        request.onerror = (event) => reject(event)
      }
    })
  }

  /**
   * @param id
   * @description  读取数据
   * ```ts
   * IndexedDB.read(1735198987179)
   * ```
   */
  static async read(id: number): Promise<any> {
    await this.ensureDBAndStore()

    return new Promise(async (resolve, reject) => {
      const request = this.store?.get(id)
      if (request) {
        request.onsuccess = (event) => {
          if (event.target instanceof IDBRequest) {
            resolve(event.target.result)
          }
        }
        request.onerror = (error) => reject(error)
      }
    })
  }

  /**
   * @param id 主键
   * @description  读取数据
   * ```ts
   * IndexedDB.update(data)
   * ```
   */
  static async update(id: number): Promise<void> {
    await this.ensureDBAndStore()
    return new Promise(async (resolve, reject) => {
      const request = this.store?.put({
        ...await this.read(id),
        id,
        createTimer: new Date().valueOf() + this.#SAVE_TIMER
      })
      if (request) {
        request.onsuccess = (event) => {
          if (event.target instanceof IDBRequest) {
            resolve(event.target.result)
          } else {
            reject()
          }
        }
        request.onerror = (error) => reject(error)
      }
    })
  }

  /**
   * @param id 主键
   * @param data 数据
   * @description  读取数据
   * ```ts
   * IndexedDB.delete(data)
   * ```
   */
  static async delete(id: number): Promise<void> {
    await this.ensureDBAndStore()

    return new Promise<void>(async (resolve, reject) => {
      const request = this.store?.delete(id)
      if (request) {
        request.onsuccess = () => resolve()
        request.onerror = (event) => reject(event)
      }
    })
  }

  /**
   * @description  读取全部数据
   * ```ts
   * IndexedDB.findAll()
   * ```
   */
  static async findAll() {
    await this.ensureDBAndStore()

    return new Promise((resolve, reject) => {
      const request = this.store?.index(this.#BOOK_CONTENT_INDEX).getAll()
      if (request) {
        request.onsuccess = (event) => {
          if (event.target instanceof IDBRequest) {
            const result = event.target.result
            result.sort((a: IndexedDBBookType, b: IndexedDBBookType) => b.createTimer - a.createTimer)
            resolve(result)
          } else {
            reject()
          }
        }
        request.onerror = (error) => reject(error)
      }
    })
  }

  static async baseTimerClearData() {
    await this.ensureDBAndStore()

    return new Promise((resolve, reject) => {
      const request = this.store?.index(this.#BOOK_CONTENT_INDEX).getAll(IDBKeyRange.upperBound(+new Date()))
      if (request) {
        request.onsuccess = (event) => {
          if (event.target instanceof IDBRequest) {
            const data = event.target.result
            data.forEach((item: {
              id: number,
              content: Array<string>
              chapter: Array<string>,
              createTimer: number
            }) =>
              this.delete(item.id)
            )
            resolve(event.target.result)
          } else {
            reject()
          }
        }
        request.onerror = (error) => reject(error)
      }
    })
  }
}


