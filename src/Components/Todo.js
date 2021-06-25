import React, { useState, useEffect } from 'react';
import "../App.css"

const getLocalItems = () => {
    let list = localStorage.getItem('lists');
    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
}

const Todo = () => {

    const [inputdata, setinputdata] = useState('');
    const [items, setitems] = useState(getLocalItems());

    const addItem = () => {
        if (!inputdata) {
            alert("Please input valid data");
        } else {
            setitems([...items, inputdata]);
            setinputdata('');
        }
    }

    const deleteitem = (id) => {
        const updateditems = items.filter((elem, ind) => {
            return ind != id;
        });

        setitems(updateditems);
    }

    const removeall = () => {
        setitems([]);
    }

    // add data to local storage

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items])

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <a href="https://www.flaticon.com/" title="Flaticon"></a>
                    <h1>ToDo List</h1>
                    <div className="additems">
                        <label>
                            <input type="text" placeholder=" ✍️ Add items..." value={inputdata} onChange={(e) => {
                                setinputdata(e.target.value)
                            }} />
                            <i className="fa fa-plus add-btn" title="Add item" onClick={addItem}></i>
                        </label>


                        <div className="showItems">

                            {
                                items.map((elem, index) => {
                                    return (
                                        <div className="eachItem" key={index}>
                                            <h3>{elem}</h3>
                                            <i className="far fa-trash-alt del-btn" title="Delete item" onClick={() => deleteitem(index)}></i>
                                        </div>
                                    )
                                })
                            }


                        </div>
                        <div className="showItems">
                            <button className="btn effect04" data-sm-link-text="Remove all" onClick={removeall}><span>Clear list</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo;