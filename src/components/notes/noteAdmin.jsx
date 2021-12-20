import React, { useState } from 'react';

var itemList = JSON.parse(localStorage.getItem('itemList')) || [];
let cont = itemList.length;

function Notes({index, createdBy, name,content, date, tags, likedBy, dislikedBy, currentUser}) {
    function deleteNote() {
        itemList.splice(index, 1);
    }

    function likeNote() {
        if (itemList[index].likedBy.includes(currentUser)) {
            itemList[index].likedBy.filter((item) => {return item !== currentUser});
        } else {
            if (itemList[index].dislikedBy.includes(currentUser)) {
                itemList[index].dislikedBy.filter((item) => {return item !== currentUser});
            }
            itemList[index].likedBy.push(currentUser);
        }
    }

    function dislikeNote() {
        if (itemList[index].dislikedBy.includes(currentUser)) {
            itemList[index].dislikedBy.filter((item) => {return item !== currentUser});
        } else {
            if (itemList[index].likedBy.includes(currentUser)) {
                itemList[index].likedBy.filter((item) => {return item !== currentUser});
            }
            itemList[index].dislikedBy.push(currentUser);
        }
    }

    if(createdBy === currentUser) {
        <div className="container py-3 h-100">
        <div className="card">
        <h5 className="card-header">Note by {createdBy} on {date}</h5>
        <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">
            {content}
            </p>
            <a href="#" className="btn btn-primary" onClick={likeNote}>{likedBy.length} 👍</a>
            <a href="#" className="btn btn-warning" onClick={dislikeNote}>{dislikedBy.length} 👎</a>
            <a href="#" className="btn btn-danger" onClick={deleteNote}>Delete post 🗑️</a>
        </div>
        </div>
        </div>
    }

    return(
        <div className="container py-3 h-100">
        <div className="card">
        <h5 className="card-header">Note by {createdBy} on {date}</h5>
        <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">
            {content}
            </p>
            <a href="#" className="btn btn-primary" onClick={likeNote}>{likedBy.length} 👍</a>
            <a href="#" className="btn btn-warning" onClick={dislikeNote}>{dislikedBy.length} 👎</a>
        </div>
        </div>
        </div>
    );
}

function NoteAdmin({username}) {
    const [noteName, setNoteName] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [tags, setTags] = useState([]);

    const printList = () => {
        //deleting any item if the list isn't empty
        var elem = list.lastElementChild;
        while(elem){
            list.removeChild(elem);
            elem = list.lastElementChild;
        }

        itemList.forEach((element) => {
            const newItemDiv = document.createElement('div');
            const newItemState = document.createElement('input');
            const newItemName = document.createElement('label');
        
            newItemName.appendChild(document.createTextNode(element.name));
            newItemState.type = 'checkbox';
            newItemState.id = element.cbId;
            newItemState.checked = (element.isChecked === 'true');
        
            newItemDiv.appendChild(newItemState);
            newItemDiv.appendChild(newItemName);
            list.appendChild(newItemDiv);
        })
    }

    function addNote() {
        const itemName = elementTb.value;

        if(itemName !== ''){
            const newItemDiv = document.createElement('div');
            const newItemState = document.createElement('input');
            const newItemName = document.createElement('label');
            
            newItemName.appendChild(document.createTextNode(itemName));
            newItemState.type = 'checkbox';
            newItemState.checked = false;
            newItemState.id = "cb" + cont;
            cont++;
            
            newItemDiv.appendChild(newItemState);
            newItemDiv.appendChild(newItemName);
            list.appendChild(newItemDiv);
            
            const listItem = {
                cbId: newItemState.id,
                isChecked: 'false',
                name: itemName
            }
        
            itemList.push(listItem);
        
            localStorage.setItem('itemList', JSON.stringify(itemList));
        
            elementTb.value = '';
        }
    }

    return (
        <div>
            <div className="container py-3 h-100">
            <form>
            <h5>Create a note</h5>
            <br/>
            <div className="form-outline mb-4">
                <input type="text" id="form4Example1" className="form-control" value={postName} onChange={(e) => setPostName(e.target.value)}/>
                <label className="form-label" htmlFor="form4Example1">Title</label>
            </div>

            <div className="form-outline mb-4">
                <textarea className="form-control" id="form4Example3" rows="4" value={postContent} onChange={(e) => setPostContent(e.target.value)}></textarea>
                <label className="form-label" htmlFor="form4Example3">Post</label>
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4" onClick={addPost}>Publish</button>
            </form>
            </div>
            <br/>
            <div className="centeredDiv">
            <div className="btn-group">
            <input
                type="radio"
                className="btn-check"
                name="options"
                id="option1"
                autoComplete="off"
                defaultChecked
                onClick={() => setShowAll(true)}
            />
            <label className="btn btn-primary" htmlFor="option1">Show all</label>

            <input type="radio" className="btn-check" name="options" id="option2" autoComplete="off" onClick={() => setShowAll(false)}/>
            <label className="btn btn-primary" htmlFor="option2">Show liked</label>

            </div>
            </div>
            <br/>
            <div>
                {
                    printPosts()
                }
            </div>
        </div>
    );
}
export default NoteAdmin;