import { IndexedDBBookType } from "../types"

export class IndexedDB {
  static readonly #DATABASE_NAME: string = "ink_spell"
  static readonly #VERSION: number = 1
  static readonly #BOOK_CONTENT: string = "book_content"
  static readonly #BOOK_CONTENT_INDEX: string = "book_content_index"
  static readonly #SAVE_TIMER: number = 1000 * 60 * 60 * 24 * 15

  static db: IDBDatabase | undefined = undefined;


  /**
 * @description 确保数据库已打开
 * ```ts
 * IndexedDB.ensureDB()
 * ```
 */
  static async ensureDB(): Promise<void> {
    if (!this.db) {
      await this.openDB();
    }

  }

  /**
   * @description 打开数据库
   * ```ts
   * IndexedDB.openDB()
   * ```
   */
  static openDB(): Promise<void> {
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
          if (!this.db.objectStoreNames.contains(this.#BOOK_CONTENT)) {
            const store = this.db.createObjectStore(this.#BOOK_CONTENT, { keyPath: 'id' })
            store.createIndex(this.#BOOK_CONTENT_INDEX, 'createTimer', { unique: false });
          }
        }
      };
    })
  }

  /**
  * @description  获取事物和存储对象
  * ```ts
  * IndexedDB.getTransaction()
  * ```
  */
  static async getTransaction(storeName: string, mode: IDBTransactionMode): Promise<IDBObjectStore> {
    if (!this.db) {
      throw new Error("Database is not initialized. Call ensureDB first.");
    }
    const transaction = this.db.transaction(storeName, mode)
    return transaction.objectStore(storeName)
  }

  /**
   * @description  添加数据
   * ```ts
   * IndexedDB.add()
   * ```
   */
  static async add(data: any): Promise<void> {
    await this.ensureDB()

    return new Promise<void>(async (resolve, reject) => {
      const store = await this.getTransaction(this.#BOOK_CONTENT, "readwrite");
      const request = store.add({
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
    await this.ensureDB()

    return new Promise(async (resolve, reject) => {
      const store = await this.getTransaction(this.#BOOK_CONTENT, "readonly");
      const request = store.get(id)
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
   * @description  更新数据
   * ```ts
   * IndexedDB.update(data)
   * ```
   */
  static async update(id: number): Promise<void> {
    await this.ensureDB()
    const existingData = await this.read(id);
    return new Promise(async (resolve, reject) => {
      const store = await this.getTransaction(this.#BOOK_CONTENT, "readwrite");
      const request = store.put({
        ...existingData,
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
    await this.ensureDB()

    return new Promise<void>(async (resolve, reject) => {
      const store = await this.getTransaction(this.#BOOK_CONTENT, "readwrite");
      const request = store.delete(id)
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
    await this.ensureDB()

    return new Promise(async (resolve, reject) => {
      const store = await this.getTransaction(this.#BOOK_CONTENT, "readwrite");
      const request = store.index(this.#BOOK_CONTENT_INDEX).getAll()
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
    await this.ensureDB()

    return new Promise(async (resolve, reject) => {
      const store = await this.getTransaction(this.#BOOK_CONTENT, "readwrite");

      const request = store.index(this.#BOOK_CONTENT_INDEX).getAll(IDBKeyRange.upperBound(+new Date()))
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


