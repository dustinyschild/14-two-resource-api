'use srtict';

const mongoose = require('mongoose');
const List = require('../model/list');
const { expect } = require('chai');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/401-notes';
mongoose.connection.db || mongoose.connect(MONGODB_URI);

describe('list model',function(){
  it('fails if name is missing',function(){
    let list = new List({});

    return list.save()
      .catch(err => {
        expect(err.name).to.equal('ValidationError');
      });
  });
  it('can be saved',function(){
    let list = new List({
      name: 'to-do'
    });

    return list.save()
      .then(saved => {
        expect(saved.name).to.equal('to-do');
      });
  });
});

describe('findById',function(){
  before(function(){
    return (
      new List({
        name: 'find me'
      }).save()
        .then(saved => this.findMe = saved)
    );
  });
  it('can find by id',function(){
    return List.findById(this.findMe._id)
      .then(found => {
        expect(found.name).to.equal('find me');
      });
  });
});

describe('findByIdAndUpdate',function(){
  before(function(){
    return (
      new List({
        name: 'update me'
      }).save()
        .then(update => this.updateMe = update)
    );
  });
  it('should find by id and update',function(){
    return List.findByIdAndUpdate(this.updateMe._id,{ name: 'updated' },{ new: true })
      .then(updatedNote => {
        expect(updatedNote.name).to.equal('updated');
      });
  });
});

describe.only('findByIdAndAddNote',function(){
  before(function(){
    return (
      new List({
        name: 'notes'
      }).save()
        .then(saved => this.testList = saved)
    );
  });
  it('should add a note to the list',function(){
    return List.findByIdAndAddNote(
      this.testList._id,
      { title: 'new note'}
    ).then(note => {
      expect(note.title).to.equal('new note');
      expect(note.listID.toString()).to.equal(this.testList._id.toString());

      return List.findById(this.testList._id)
        .then()
    })

  });
});
