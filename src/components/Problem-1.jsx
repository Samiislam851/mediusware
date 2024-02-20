import React, { useState } from 'react';

const Problem1 = () => {

    const [show, setShow] = useState('all');
    const [tasks, setTasks] = useState([]);




    const handleSubmit = (e) => {
        e.preventDefault()


        const newData = {
            name: e.target.name.value,
            status: e.target.status.value
        }


        setTasks(prev => {
            const completedTasks = prev.filter(task => task.status.toLowerCase() === 'completed')
            console.log('completedTasks', completedTasks);

            const activeTasks = prev.filter(task => task.status.toLowerCase() === 'active')
            console.log('activeTasks', activeTasks);

            const otherTasks = prev.filter(task => task.status.toLowerCase() !== 'active' && task.status.toLowerCase() !== 'completed')

            if (newData.status.toLowerCase() === 'completed') {
                completedTasks.push(newData)
            } else if (newData.status.toLowerCase() === 'active') {
                activeTasks.push(newData)
            } else {
                otherTasks.push(newData)
            }


            return [...completedTasks, ...activeTasks, ...otherTasks]
        })


        e.target.reset()
    }


    const handleClick = (val) => {
        setShow(val);
    }


    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form onSubmit={handleSubmit} className="row gy-2 gx-3 align-items-center mb-4">
                        <div className="col-auto">
                            <input type="text" name='name' className="form-control" placeholder="Name" />
                        </div>
                        <div className="col-auto">
                            <input type="text" name="status" className="form-control" placeholder="Status" />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'all' && 'active'}`} type="button" onClick={() => handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'active' && 'active'}`} type="button" onClick={() => handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'completed' && 'active'}`} type="button" onClick={() => handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.length > 0 && tasks.map((task,i) => {
                                if ((show === 'all') || (show === 'active' && task.status.toLowerCase() === 'active') || (show === 'completed' && task.status.toLowerCase() === 'completed')) {
                                    return (
                                        <tr key={i}>
                                            <td>{task.name}</td>
                                            <td>{task.status}</td>
                                        </tr>
                                    );
                                }
                                return null;
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;