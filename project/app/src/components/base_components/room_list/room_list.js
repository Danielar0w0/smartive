import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { MiniPanel } from "../mini_panel";
import axios from 'axios'

import React, { useState, useEffect }  from 'react';

export class RoomList extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            isActive: false,
        };

        this.test();

    }

    test() {

        console.log("HEEEY");
        console.log("Hello");

        this.setState({ loading: true });

        const apiUrl = 'http://localhost:8080/api/rooms';
        axios.get(apiUrl, {
            headers: {'Origin': 'http://localhost:3000'}
        }).then((repos) => {
            const allRepos = repos.data;
            console.log(allRepos);
            this.setState({ loading: false, repos: allRepos });
        })
        .catch(error => console.log(error));

    };


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