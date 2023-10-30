const notifications = {
    state: () => ({ 
        notificationsInfos: {}, 
    }),
    mutations: { 
        setNotificationsInfos(state, infos){
            state.notificationsInfos = infos;
        }
    },
}
export default notifications;