const defaultState = {
    roomName: '',
    isRecording: false,
    isListening: false,
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

        case 'START_LISTENING':
            return {
                ...state,
                isListening: true,
                roomName: action.payload.roomName
            }

        case 'STOP_LISTENING':
            return {
                ...state,
                isListening: false
            }

        case 'CHANGE_ROOM_NAME':
            return {
                ...state,
                roomName: action.payload
            }

        default:
            return state
    }
}

export default reducer