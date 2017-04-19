const defaultState = {
    roomName: '',
    isRecording: false
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'START_RECORDING':
            return {
                ...state,
                isRecording: true,
                roomName: action.payload.roomName
            }

        case 'STOP_RECORDING':
            return {
                ...state,
                isRecording: false
            }

        case 'CHANGE_ROOM_NAME':
            return {
                ...state,
                isRecording: false
            }

        default:
            return state
    }
}

export default reducer