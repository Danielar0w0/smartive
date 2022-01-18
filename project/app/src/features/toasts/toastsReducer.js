const initialState = {}

export default function toastsReducer(state = initialState, action) {

    switch (action.type) {

        case 'toasts/displayToast':
            return {
                ...state,
                toast: action.payload
            }

        default:
            return state

    }

}