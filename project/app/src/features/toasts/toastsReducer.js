const initialState = {}

export default function toastsReducer(state = initialState, action) {

    switch (action.type) {

        case 'toasts/setToast':
            return {
                ...state,
                toast: action.payload
            }

        case 'toasts/clearToast':
            return {
                ...state,
                toast: undefined
            }

        default:
            return state

    }

}