
/**
 * Each List of TODOs
 */
export interface TodoList {
  /** List ID */
  id: number
  /** List name */
  name: string
  /** List TODO items */
  todoItems: TodoItem[]
}

/**
 * Individual TODO Item
 */
export interface TodoItem {
  /** TODO ID */
  id: number
  /** TODO name */
  name: string
  /** TODO description */
  description: string
  /** TODO completed status */
  done: boolean
}
