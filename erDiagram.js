//DB model
let modelDB = {
    _id: String,
    title: String,
    content: String,
    author_id: String,
    comments: Array(
    {
        _commentId: String,
        comment: String,
        author_id: String
    },
    {
        
    },
    {

    },
    {

    })
}
/* Example database */
let example = {
    "_id": "FxFEJPKs6861r8mK",
    'title': "Ett blogginlägg",
    "content": "Lorem Ipsum",
    "author_id": "kwdoqp9241+",
    "comments": [
        {
            "_commentId": "mfwe2382jhero",
            "comment": "Jätteintressant!",
            "author": "superChicken23"
        }
    ]
}