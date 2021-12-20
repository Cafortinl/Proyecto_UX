import React, { useState } from 'react';

//const noteList = JSON.parse(localStorage.getItem('noteList')) || [];
//let cont = noteList.length;

function NoteAdmin({username}) {
    const [noteName, setNoteName] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [tags, setTags] = useState([]);
    const [noteList, setNoteList] = useState(JSON.parse(localStorage.getItem('noteList')) || []);

    function addNote() {
        const date = new Date();
        setNoteList([...noteList, {
            createdBy: username, 
            name: noteName,
            content: noteContent, 
            date: date.getFullYear().toString().substr(-2)+'/'+(date.getMonth()+1)+'/'+date.getDate(), 
            tags: [], 
            likedBy: [], 
            dislikedBy: []
        }]);
        console.log(noteList);
        localStorage.setItem('noteList', JSON.stringify(noteList));
        setNoteName('');
        setNoteContent('');
    }

    function Notes({index, createdBy, name,content, date, tags, likedBy, dislikedBy, currentUser}) {
        function deleteNote() {
            setNoteList([...noteList.splice(index, 1)]);
            localStorage.setItem('noteList', JSON.stringify(noteList));
        }
    
        function likeNote() {
            if (noteList[index].likedBy.includes(currentUser)) {
                noteList[index].likedBy.filter((item) => {return item !== currentUser});
            } else {
                if (noteList[index].dislikedBy.includes(currentUser)) {
                    noteList[index].dislikedBy.filter((item) => {return item !== currentUser});
                }
                noteList[index].likedBy.push(currentUser);
            }
        }
    
        function dislikeNote() {
            if (noteList[index].dislikedBy.includes(currentUser)) {
                noteList[index].dislikedBy.filter((item) => {return item !== currentUser});
            } else {
                if (noteList[index].likedBy.includes(currentUser)) {
                    noteList[index].likedBy.filter((item) => {return item !== currentUser});
                }
                noteList[index].dislikedBy.push(currentUser);
            }
        }
    
        if(createdBy === currentUser) {
            return(
                <div className="container py-3 h-100">
                <div className="card">
                <h5 className="card-header">Note by {createdBy} on {date} index: {index}</h5>
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
            );
        }
    
        return(
            <div className="container py-3 h-100">
            <div className="card">
            <h5 className="card-header">Note by {createdBy} on {date} index: {index}</h5>
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

    return (
        <div>
            <div className="container py-3 h-100">
            <form>
            <h5>Create a note</h5>
            <br/>
            <div className="form-outline mb-4">
                <input type="text" id="form4Example1" className="form-control" value={noteName} onChange={(e) => setNoteName(e.target.value)}/>
                <label className="form-label" htmlFor="form4Example1">Title</label>
            </div>

            <div className="form-outline mb-4">
                <textarea className="form-control" id="form4Example3" rows="4" value={noteContent} onChange={(e) => setNoteContent(e.target.value)}></textarea>
                <label className="form-label" htmlFor="form4Example3">Post</label>
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4" onClick={addNote}>Publish</button>
            </form>
            </div>
            <br/>
            
            <br/>
            <div>
                {
                    noteList.map((elem, i) => (
                        <Notes index={i} {...elem} currentUser={username}/>
                    ))
                }
            </div>
        </div>
    );
}
export default NoteAdmin;