import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { MiniPanel } from "../mini_panel";
import axios from 'axios'

import React, { useState, useEffect }  from 'react';
import { RestAPIHandler } from "../../../utils/RestAPIHandler";

export class RoomList extends React.Component {

    constructor(props) {

        super(props);
        this.apiHandler = new RestAPIHandler();
        this.state = {
            isActive: false,
        };

    }

    componentDidMount() {
        this.apiHandler.getAllRooms();
    }


    render() {

       /* const Home = () => {const [error, setError] = useState(null);
            const [isLoaded, setIsLoaded] = useState(false);
            const [users, setUsers] = useState([]);    useEffect(() => {
                fetch("https://jsonplaceholder.typicode.com/users/")
                    .then(res => res.json())
                    .then(
                        (data) => {
                            setIsLoaded(true);
                            setUsers(data);
                        },
                        (error) => {
                            setIsLoaded(true);
                            setError(error);
                        }
                    )
            }, [])

            if (error) {
                return <div>Error: {error.message}</div>;
            } else if (!isLoaded) {
                return <div>Loading...</div>;
            } else {
                return (
                    <ul>
                        {users.map(user => (
                            <li key={user.id}>
                                {user.name}
                            </li>
                        ))}
                    </ul>
                );
            }
        }

        Home()
*/
        return (
            <ScrollMenu>
                <MiniPanel
                    room_name={'Living Room'}
                    power_consumption={'700 kWh'}
                />
                <MiniPanel
                    room_name={'Living Room'}
                    power_consumption={'700 kWh'}
                />
                <MiniPanel
                    room_name={'Living Room'}
                    power_consumption={'700 kWh'}
                />
                <MiniPanel
                    room_name={'Living Room'}
                    power_consumption={'700 kWh'}
                />
            </ScrollMenu>
        );

    }

}