import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';


 export type EditTaskArgs = {
  taskId: number
  taskNewTitle: string

}


export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const taskExist = tasks.find(tasks => tasks.title === newTaskTitle)

    if (taskExist)

      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com mesmo nome!')






    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }


    setTasks(oldTasks => [...oldTasks, newTask])




  }
  function handleToggleTaskDone(id: number) {
    const updateTasks = tasks.map(task => ({ ...task }))

    const foundItem = updateTasks.find(item => item.id === id)

    if (!foundItem)
      return

    foundItem.done = !foundItem.done
    setTasks(updateTasks)


  }

  function handleRemoveTask(id: number) {

    Alert.alert('Remover item', 'Tem certeza que você deseja remover item?', [

      {
        style: 'cancel',
        text: 'Não'
      },
      {
        style: 'destructive',
        text: 'Sim',
        onPress: () => {
          const updateTasks = tasks.filter(task => task.id !== id)
          setTasks(updateTasks)

        }
      }

    ])
  }

  function handleEditTask({taskId, taskNewTitle} : EditTaskArgs) {
    const updatedTasks = tasks.map(task => ({...task}))

    const taskToBeUpdated = updatedTasks.find(task => task.id === taskId)

    if (!taskToBeUpdated)
      return

      taskToBeUpdated.title = taskNewTitle
    }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})