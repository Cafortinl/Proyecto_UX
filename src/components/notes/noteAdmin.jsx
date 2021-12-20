import React, { useState } from 'react';

var list = JSON.parse(localStorage.getItem('noteList')) || [];
//let cont = noteList.length;

function NoteAdmin({username}) {
    const [noteName, setNoteName] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [tags, setTags] = useState([]);
    const [noteList, setNoteList] = useState(JSON.parse(localStorage.getItem('noteList')) || []);

    function addNote() {
        const date = new Date();
        list.push({
            createdBy: username, 
            name: noteName,
            content: noteContent, 
            date: date.getFullYear().toString().substr(-2)+'/'+(date.getMonth()+1)+'/'+date.getDate(), 
            tags: [], 
            likedBy: [], 
            dislikedBy: []
        });
        setNoteList([...list]);
        localStorage.setItem('noteList', JSON.stringify(noteList));
        setNoteName('');
        setNoteContent('');
    }

    function Notes({index, createdBy, name,content, date, tags, likedBy, dislikedBy, currentUser}) {
        function deleteNote() {
            list.splice(index, 1);
            setNoteList([...list]);
            localStorage.setItem('noteList', JSON.stringify(noteList));
        }
    
        function likeNote() {
            if (list[index].likedBy.includes(currentUser)) {
                list[index].likedBy = list[index].likedBy.filter((item) => {return item !== currentUser});
            } else {
                if (list[index].dislikedBy.includes(currentUser)) {
                    list[index].dislikedBy = list[index].dislikedBy.filter((item) => {return item !== currentUser});
                }
                list[index].likedBy.push(currentUser);
            }
            setNoteList([...list]);
            localStorage.setItem('noteList', JSON.stringify(noteList));
        }
    
        function dislikeNote() {
            if (list[index].dislikedBy.includes(currentUser)) {
                list[index].dislikedBy = list[index].dislikedBy.filter((item) => {return item !== currentUser});
            } else {
                if (list[index].likedBy.includes(currentUser)) {
                    list[index].likedBy = list[index].likedBy.filter((item) => {return item !== currentUser});
                }
                list[index].dislikedBy.push(currentUser);
            }
            setNoteList([...list]);
            localStorage.setItem('noteList', JSON.stringify(noteList));
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