migrate((db) => {
  const collection = new Collection({
    "id": "y1lt3hj0eve59u1",
    "created": "2023-11-19 21:10:45.607Z",
    "updated": "2023-11-19 21:10:45.607Z",
    "name": "comments",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ml36k7gf",
        "name": "author_id",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "ruwrrlfw",
        "name": "contentText",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": 500,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "upk0tagr",
        "name": "upvote_ids",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("y1lt3hj0eve59u1");

  return dao.deleteCollection(collection);
})
