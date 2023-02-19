import React, {useReducer, useMemo, createContext} from "react";
import produce from "immer";
import UserList from "./UserList";
import CreateUser from "./CreateUser";

window.produce = produce;

function countActiveUsers(users) {
    console.log('활성 사용자 수를 세는 중...');
    return users.filter(user => user.active).length;
}

const initialStatus = {
    inputs: {
        username: '',
        email: '',
    },
    users: [
        {
            id: 1,
            username: 'jsj',
            email: 'jeongseonju15@gmail.com',
            active: true,
        },
        {
            id: 2,
            username: 'tester',
            email: 'tester@example.com',
            active: false,
        },
        {
            id: 3,
            username: 'liz',
            email: 'liz@example.com',
            active: false,
        }
    ]
}

function reducer(state, action) {
    switch (action.type) {
        case 'CREATE_USER':
            return produce(state, draft => {
                draft.users.push(action.user);
            });
        case 'TOGGLE_USER':
            return produce(state, draft => {
                const user = draft.user.find(user => user.id === action.id);
                user.active = !user.active;
            });
        case 'REMOVE_USER':
            return produce(state, draft => {
                const index = draft.users.findIndex(user => user.id === action.id);
                draft.users.splice(index, 1);
            });
        default:
            throw new Error('UnHandled Action');
    }
}

export const UserDispatch = createContext(null);

function App() {
    const [state, dispatch] = useReducer(reducer, initialStatus);
    const {users} = state;

    const count = useMemo(() => countActiveUsers(users), [users]);

    return (
        <UserDispatch.Provider value={dispatch}>
            <CreateUser/>
            <UserList users={users}/>
            <div>활성 사용자 수 : {count}</div>
        </UserDispatch.Provider>
    );
}

export default App;
