import { defineStore } from 'pinia';
const useEventsStore = defineStore({
  id: 'events',
  state: () => ({
   events:[
    { id: 1, title: "What is Lorem Ipsum?", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", done: true, date:"Fri Feb 09 2024 00:00:00 GMT+0400 (Armenia Standard Time)" },
    { id: 2, title: "Why do we use it?", description: "lorem ipsum", done: false, date:"Tue Feb 13 2024 00:00:00 GMT+0400 (Armenia Standard Time)" },
    { id: 3, title: "Where does it come from?", description: "lorem ipsum", done: false, date:"Wed Feb 21 2024 00:00:00 GMT+0400 (Armenia Standard Time)"},
    { id: 4, title: "Where can I get some?", description: "lorem ipsum", done: false, date:"Mon Feb 19 2024 00:00:00 GMT+0400 (Armenia Standard Time)"},
   ]
  }),
  actions: {
    addEvent(eventData) {
        this.events.push({...eventData,done:false,id:this.events.length + 1})
    },
    deleteEvent(eventId) {
      let index = this.events.findIndex((event) => event.id === eventId )
      let start = this.events.slice(0,index)
      let end = this.events.slice(index +1)
      this.events = [...start,...end]
    },
    checkedEvent(eventId){
        let index = this.events.findIndex((event) => event.id === eventId )
        this.events[index].done = !this.events[index].done
    }   
  },
});
export {
    useEventsStore
}