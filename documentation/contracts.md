## Models

#### Post (Backend)
```
Post {
    id:int,
    userId: int,
    img: string,
    description: string,
    createdOn: LocalDate
}
```

#### PageOfItems (Backend and Frontend)
```
PageOfItems<T> {
    items: List<T>,
    hasNext: boolean,
    totalElements: int
}
```

#### Post (Frontend)
```
Post {
    id:int,
    user: User,
    img: string,
    description: string,
    createdOn: date
    comments: PageOfItems<Comment>
}
```

#### Comment
```
Comment {
    id:int,
    postId: int,
    username: string,
    body: string,
    createdOn: LocalDate
}
```

#### User
```
User {
    id: int,
    username: string,
    profileImg: string
}
```

## Endpoints

#### FEMS Endpoints
```
// Post Controller
"/posts?pageNumber={int}&pageSize={int}"

"/posts/{postId}/comments?pageNumber={pageNumber}&pageSize={pageSize}"
```

#### Post CRUD
```
// Post Controller
"/posts?pageNumber={int}&pageSize={int}"
```

#### Comment CRUD
```
"/comments?postId={postId}&pageNumber={pageNumber}&pageSize={pageSize}""
```

#### User CRUD
```
"/users/id"
```