import React, { useState } from 'react';
import './style.css';

var list = JSON.parse(localStorage.getItem('noteList')) || [];

function NoteAdmin({username}) {
    const [noteContent, setNoteContent] = useState('');
    const [tagString, setTagString] = useState('');
    const [noteList, setNoteList] = useState(list);
    const [searchTags, setSearchTags] = useState('');
    const [showAll, setShowAll] = useState(true);

    function addNote() {
        const date = new Date();
        console.log(tagString);
        const tempArr = tagString.split(', ');
        list.unshift({
            createdBy: username,
            content: noteContent, 
            date: date.getFullYear().toString().substr(-2)+'/'+(date.getMonth()+1)+'/'+date.getDate() + ' ' + date.getHours()+':'+date.getMinutes()+':'+date.getSeconds(), 
            tags: tempArr, 
            likedBy: [], 
            dislikedBy: []
        });
        setNoteList([]);
        setNoteList(list);
        localStorage.setItem('noteList', JSON.stringify(noteList));
        setNoteContent('');
        setTagString('');
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
                    <p>Tags: {tags.toString()}</p>
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
                <p>Tags: {tags.toString()}</p>
                <a href="#" className="btn btn-primary" onClick={likeNote}>{likedBy.length} 👍</a>
                <a href="#" className="btn btn-warning" onClick={dislikeNote}>{dislikedBy.length} 👎</a>
            </div>
            </div>
            </div>
        );
    }

    function printFeed() {
        if(searchTags === '') {
            return (
                noteList.map((elem, i) => (
                    <Notes index={i} {...elem} currentUser={username}/>
                ))
            );
        }

        var tagArr = searchTags.split(', ');
        var tempArr = [];
        for (let i = 0; i < noteList.length; i++) {
            if (list[i].tags.some(tag => tagArr.includes(tag)) && !tempArr.includes(list[i])) {
                tempArr.unshift(noteList[i]);
            }
        
        }

        return (
            tempArr.map((elem, i) => (
                <Notes index={i} {...elem} currentUser={username}/>    
            ))
        );
        
    }

    return (
        <div>
            <div className="container py-2 h-100 mainDiv">
            <form>
            <h5>Create a note</h5>
            <br/>

            <div className="form-outline mb-2">
                <textarea className="form-control" id="form4Example3" rows="4" value={noteContent} onChange={(e) => setNoteContent(e.target.value)}></textarea>
                <label className="form-label" htmlFor="form4Example3">Note</label>
            </div>

            <div className="form-outline mb-4">
                <input type="text" id="form4Example1" className="form-control" value={tagString} onChange={(e) => setTagString(e.target.value)} placeholder='tag1, tag2, tag3, ...'/>
                <label className="form-label" htmlFor="form4Example1">Tags</label>
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4" onClick={addNote}>Publish</button>
            </form>

            <br/>

            <div className="input-group">
            <div className="form-outline">
            <label className="form-label" htmlFor="form4Example1">Tag search</label>
                <input type="search" id="form1" className="form-control" placeholder='tag1, tag2, tag3, ...' value={searchTags} onChange={(e) => setSearchTags(e.target.value)}/>
            </div>
            </div>

            </div>
            <br/>

            <br/>
            <div className="mainDiv">
                {
                    printFeed()
                }
            </div>
        </div>
    );
}
export default NoteAdmin;