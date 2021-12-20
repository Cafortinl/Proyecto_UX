import React, { useState } from 'react';

var list = JSON.parse(localStorage.getItem('noteList')) || [];

function NoteAdmin({username}) {
    const [noteContent, setNoteContent] = useState('');
    const [tags, setTags] = useState([]);
    const [tagString, setTagString] = useState('');
    const [noteList, setNoteList] = useState(list);

    function addNote() {
        const date = new Date();
        setTags(tagString.split(', '));
        list.unshift({
            createdBy: username,
            content: noteContent, 
            date: date.getFullYear().toString().substr(-2)+'/'+(date.getMonth()+1)+'/'+date.getDate() + ' ' + date.getHours()+':'+date.getMinutes()+':'+date.getSeconds(), 
            tags: tags, 
            likedBy: [], 
            dislikedBy: []
        });
        console.log(list);
        setNoteList([]);
        setNoteList(list);
        localStorage.setItem('noteList', JSON.stringify(noteList));
        console.log(JSON.parse(localStorage.getItem('noteList')));
        setNoteContent('');
        setTagString('');
        setTags([]);
    }

    function Notes({index, createdBy,content, date, tags, likedBy, dislikedBy, currentUser}) {
        function deleteNote() {
            if(list.length > 1){
                list.splice(index, 1);
                setNoteList([...list]);
                localStorage.setItem('noteList', JSON.stringify(noteList));
            } else {
                list = [];
                setNoteList([...list]);
                localStorage.removeItem('noteList');
            }
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
                <h5 className="card-header">Note by {createdBy} on {date}</h5>
                <div className="card-body">
                    <p className="card-text">
                    {content}
                    </p>
                    <p>Tags: {JSON.stringify(tags)}</p>
                    <a href="#" className="btn btn-primary" onClick={likeNote}>{likedBy.length} 👍</a>
                    <a href="#" className="btn btn-warning" onClick={dislikeNote}>{dislikedBy.length} 👎</a>
                    <a href="#" className="btn btn-danger" onClick={deleteNote}>Delete note 🗑️</a>
                </div>
                </div>
                </div>
            );
        }
    
        return(
            <div className="container py-3 h-100">
            <div className="card">
            <h5 className="card-header">Note by {createdBy} on {date}</h5>
            <div className="card-body">
                <p className="card-text">
                {content}
                </p>
                <p>Tags: {JSON.stringify(tags)}</p>
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
                <textarea className="form-control" id="form4Example3" rows="4" value={noteContent} onChange={(e) => setNoteContent(e.target.value)}></textarea>
                <label className="form-label" htmlFor="form4Example3">Note</label>
            </div>

            <div className="form-outline mb-4">
                <input type="text" id="form4Example1" className="form-control" value={tagString} onChange={(e) => setTagString(e.target.value)} placeholder='tag1, tag2, tag3, ...'/>
                <label className="form-label" htmlFor="form4Example1">Tags</label>
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