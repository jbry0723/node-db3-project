// scheme-model
const db=require('../../data/db-config')

module.exports={
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find(){
    return db()
    .from('schemes')
    .select('id','scheme_name')
}

function findById(id){
    let schemaObject=db('schemes').where('id',id).first()
    if (!schemaObject) {return Promise.resolve(null)}
    else{return schemaObject}
    
}


// select st.id, sc.scheme_name,st.step_number,st.instructions from schemes sc
// join steps st
// on sc.id=st.scheme_id
// where st.scheme_id=1
// order by st.step_number asc

function findSteps(id){
    return db('schemes as sc')
    .join('steps as st', 'st.scheme_id','sc.id')
    .select('st.id','sc.scheme_name','st.step_number','st.instructions')
    .where({ scheme_id:id })
    .orderBy('st.step_number', 'asc')
    
}

function add(scheme){
    return db('schemes').insert(scheme)
    .then (([id])=>{
        return db('schemes').where('id',id).first()
    })
}

function update(changes, id){
    return db('schemes').update(changes).where('id',id)
    .then(()=>{
        return findById(id)
    })
}

// function remove(id){                 Need to find out how to do it this way.
//     findById(id)
//     .then(obj=>{
//         if(!obj){return null}
//         else{
//             return db('schemes').where('id', id).del()
//             .then(()=>{
//                 Promise.resolve(obj)
//             })
//         }
//     })
// }

async function remove(id){
    const schemeToDelete= await findById(id)
    
        if(!schemeToDelete){return null}
        else{
        
        await db('schemes').where('id', id).del()
        return Promise.resolve(schemeToDelete)
        }
    
  
    
}
