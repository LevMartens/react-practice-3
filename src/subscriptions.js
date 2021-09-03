/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBlog = /* GraphQL */ `
  subscription OnCreateBlog {
    onCreateBlog {
      id
      name
      posts {
        items {
          id
          title
          blogID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateBlog = /* GraphQL */ `
  subscription OnUpdateBlog {
    onUpdateBlog {
      id
      name
      posts {
        items {
          id
          title
          blogID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteBlog = /* GraphQL */ `
  subscription OnDeleteBlog {
    onDeleteBlog {
      id
      name
      posts {
        items {
          id
          title
          blogID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
      id
      title
      blogID
      blog {
        id
        name
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          postID
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
      id
      title
      blogID
      blog {
        id
        name
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          postID
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
      id
      title
      blogID
      blog {
        id
        name
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          postID
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      postID
      post {
        id
        title
        blogID
        blog {
          id
          name
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      postID
      post {
        id
        title
        blogID
        blog {
          id
          name
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      postID
      post {
        id
        title
        blogID
        blog {
          id
          name
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLineDrafts = /* GraphQL */ `
  subscription OnCreateLineDrafts {
    onCreateLineDrafts {
      id
      parentId
      complete3LevelPluscode
      startingCoordinates {
        id
        lat
        lng
        createdAt
        updatedAt
      }
      finishCoordinates {
        id
        lat
        lng
        createdAt
        updatedAt
      }
      midLineCoordinates {
        id
        lat
        lng
        createdAt
        updatedAt
      }
      creatorName
      description
      title
      hashtags
      dificultyLevel
      verified
      lineCompleted
      elevationPoints
      latitudeDeltaFit
      longitudeDeltaFit
      distance
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLineDrafts = /* GraphQL */ `
  subscription OnUpdateLineDrafts {
    onUpdateLineDrafts {
      id
      parentId
      complete3LevelPluscode
      startingCoordinates {
        id
        lat
        lng
        createdAt
        updatedAt
      }
      finishCoordinates {
        id
        lat
        lng
        createdAt
        updatedAt
      }
      midLineCoordinates {
        id
        lat
        lng
        createdAt
        updatedAt
      }
      creatorName
      description
      title
      hashtags
      dificultyLevel
      verified
      lineCompleted
      elevationPoints
      latitudeDeltaFit
      longitudeDeltaFit
      distance
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLineDrafts = /* GraphQL */ `
  subscription OnDeleteLineDrafts {
    onDeleteLineDrafts {
      id
      parentId
      complete3LevelPluscode
      startingCoordinates {
        id
        lat
        lng
        createdAt
        updatedAt
      }
      finishCoordinates {
        id
        lat
        lng
        createdAt
        updatedAt
      }
      midLineCoordinates {
        id
        lat
        lng
        createdAt
        updatedAt
      }
      creatorName
      description
      title
      hashtags
      dificultyLevel
      verified
      lineCompleted
      elevationPoints
      latitudeDeltaFit
      longitudeDeltaFit
      distance
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePlusCodeLevel1 = /* GraphQL */ `
  subscription OnCreatePlusCodeLevel1 {
    onCreatePlusCodeLevel1 {
      id
      digits
      middleCoord {
        id
        lat
        lng
        createdAt
        updatedAt
      }
      level2List {
        items {
          id
          completePluscode
          parentIdWithDigits
          digits
          numberOfLines
          createdAt
          updatedAt
        }
        nextToken
      }
      numberOfLines
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePlusCodeLevel1 = /* GraphQL */ `
  subscription OnUpdatePlusCodeLevel1 {
    onUpdatePlusCodeLevel1 {
      id
      digits
      middleCoord {
        id
        lat
        lng
        createdAt
        updatedAt
      }
      level2List {
        items {
          id
          completePluscode
          parentIdWithDigits
          digits
          numberOfLines
          createdAt
          updatedAt
        }
        nextToken
      }
      numberOfLines
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePlusCodeLevel1 = /* GraphQL */ `
  subscription OnDeletePlusCodeLevel1 {
    onDeletePlusCodeLevel1 {
      id
      digits
      middleCoord {
        id
        lat
        lng
        createdAt
        updatedAt
      }
      level2List {
        items {
          id
          completePluscode
          parentIdWithDigits
          digits
          numberOfLines
          createdAt
          updatedAt
        }
        nextToken
      }
      numberOfLines
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePlusCodeLevel2 = /* GraphQL */ `
  subscription OnCreatePlusCodeLevel2 {
    onCreatePlusCodeLevel2 {
      id
      completePluscode
      parentIdWithDigits
      pluscodeParent {
        id
        digits
        middleCoord {
          id
          lat
          lng
          createdAt
          updatedAt
        }
        level2List {
          nextToken
        }
        numberOfLines
        createdAt
        updatedAt
      }
      digits
      middleCoord {
        id
        lat
        lng
        createdAt
        updatedAt
      }
      level3List {
        items {
          id
          completePluscode
          parentIdWithDigits
          digits
          numberOfLines
          createdAt
          updatedAt
        }
        nextToken
      }
      numberOfLines
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePlusCodeLevel2 = /* GraphQL */ `
  subscription OnUpdatePlusCodeLevel2 {
    onUpdatePlusCodeLevel2 {
      id
      completePluscode
      parentIdWithDigits
      pluscodeParent {
        id
        digits
        middleCoord {
          id
          lat
          lng
          createdAt
          updatedAt
        }
        level2List {
          nextToken
        }
        numberOfLines
        createdAt
        updatedAt
      }
      digits
      middleCoord {
        id
        lat
        lng
        createdAt
        updatedAt
      }
      level3List {
        items {
          id
          completePluscode
          parentIdWithDigits
          digits
          numberOfLines
          createdAt
          updatedAt
        }
        nextToken
      }
      numberOfLines
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePlusCodeLevel2 = /* GraphQL */ `
  subscription OnDeletePlusCodeLevel2 {
    onDeletePlusCodeLevel2 {
      id
      completePluscode
      parentIdWithDigits
      pluscodeParent {
        id
        digits
        middleCoord {
          id
          lat
          lng
          createdAt
          updatedAt
        }
        level2List {
          nextToken
        }
        numberOfLines
        createdAt
        updatedAt
      }
      digits
      middleCoord {
        id
        lat
        lng
        createdAt
        updatedAt
      }
      level3List {
        items {
          id
          completePluscode
          parentIdWithDigits
          digits
          numberOfLines
          createdAt
          updatedAt
        }
        nextToken
      }
      numberOfLines
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePlusCodeLevel3 = /* GraphQL */ `
  subscription OnCreatePlusCodeLevel3 {
    onCreatePlusCodeLevel3 {
      id
      completePluscode
      parentIdWithDigits
      pluscodeParent {
        id
        completePluscode
        parentIdWithDigits
        pluscodeParent {
          id
          digits
          numberOfLines
          createdAt
          updatedAt
        }
        digits
        middleCoord {
          id
          lat
          lng
          createdAt
          updatedAt
        }
        level3List {
          nextToken
        }
        numberOfLines
        createdAt
        updatedAt
      }
      digits
      middleCoord {
        id
        lat
        lng
        createdAt
        updatedAt
      }
      numberOfLines
      listOfLines {
        items {
          id
          parentId
          complete3LevelPluscode
          creatorName
          description
          title
          hashtags
          dificultyLevel
          verified
          lineCompleted
          elevationPoints
          latitudeDeltaFit
          longitudeDeltaFit
          distance
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePlusCodeLevel3 = /* GraphQL */ `
  subscription OnUpdatePlusCodeLevel3 {
    onUpdatePlusCodeLevel3 {
      id
      completePluscode
      parentIdWithDigits
      pluscodeParent {
        id
        completePluscode
        parentIdWithDigits
        pluscodeParent {
          id
          digits
          numberOfLines
          createdAt
          updatedAt
        }
        digits
        middleCoord {
          id
          lat
          lng
          createdAt
          updatedAt
        }
        level3List {
          nextToken
        }
        numberOfLines
        createdAt
        updatedAt
      }
      digits
      middleCoord {
        id
        lat
        lng
        createdAt
        updatedAt
      }
      numberOfLines
      listOfLines {
        items {
          id
          parentId
          complete3LevelPluscode
          creatorName
          description
          title
          hashtags
          dificultyLevel
          verified
          lineCompleted
          elevationPoints
          latitudeDeltaFit
          longitudeDeltaFit
          distance
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePlusCodeLevel3 = /* GraphQL */ `
  subscription OnDeletePlusCodeLevel3 {
    onDeletePlusCodeLevel3 {
      id
      completePluscode
      parentIdWithDigits
      pluscodeParent {
        id
        completePluscode
        parentIdWithDigits
        pluscodeParent {
          id
          digits
          numberOfLines
          createdAt
          updatedAt
        }
        digits
        middleCoord {
          id
          lat
          lng
          createdAt
          updatedAt
        }
        level3List {
          nextToken
        }
        numberOfLines
        createdAt
        updatedAt
      }
      digits
      middleCoord {
        id
        lat
        lng
        createdAt
        updatedAt
      }
      numberOfLines
      listOfLines {
        items {
          id
          parentId
          complete3LevelPluscode
          creatorName
          description
          title
          hashtags
          dificultyLevel
          verified
          lineCompleted
          elevationPoints
          latitudeDeltaFit
          longitudeDeltaFit
          distance
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLines = /* GraphQL */ `
  subscription OnCreateLines {
    onCreateLines {
      id
      parentId
      pluscodeParent {
        id
        completePluscode
        parentIdWithDigits
        pluscodeParent {
          id
          completePluscode
          parentIdWithDigits
          digits
          numberOfLines
          createdAt
          updatedAt
        }
        digits
        middleCoord {
          id
          lat
          lng
          createdAt
          updatedAt
        }
        numberOfLines
        listOfLines {
          nextToken
        }
        createdAt
        updatedAt
      }
      complete3LevelPluscode
      startingCoordinates {
        id
        lat
        lng
        createdAt
        updatedAt
      }
      finishCoordinates {
        id
        lat
        lng
        createdAt
        updatedAt
      }
      creatorName
      description
      title
      hashtags
      dificultyLevel
      verified
      lineCompleted
      elevationPoints
      latitudeDeltaFit
      longitudeDeltaFit
      distance
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLines = /* GraphQL */ `
  subscription OnUpdateLines {
    onUpdateLines {
      id
      parentId
      pluscodeParent {
        id
        completePluscode
        parentIdWithDigits
        pluscodeParent {
          id
          completePluscode
          parentIdWithDigits
          digits
          numberOfLines
          createdAt
          updatedAt
        }
        digits
        middleCoord {
          id
          lat
          lng
          createdAt
          updatedAt
        }
        numberOfLines
        listOfLines {
          nextToken
        }
        createdAt
        updatedAt
      }
      complete3LevelPluscode
      startingCoordinates {
        id
        lat
        lng
        createdAt
        updatedAt
      }
      finishCoordinates {
        id
        lat
        lng
        createdAt
        updatedAt
      }
      creatorName
      description
      title
      hashtags
      dificultyLevel
      verified
      lineCompleted
      elevationPoints
      latitudeDeltaFit
      longitudeDeltaFit
      distance
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLines = /* GraphQL */ `
  subscription OnDeleteLines {
    onDeleteLines {
      id
      parentId
      pluscodeParent {
        id
        completePluscode
        parentIdWithDigits
        pluscodeParent {
          id
          completePluscode
          parentIdWithDigits
          digits
          numberOfLines
          createdAt
          updatedAt
        }
        digits
        middleCoord {
          id
          lat
          lng
          createdAt
          updatedAt
        }
        numberOfLines
        listOfLines {
          nextToken
        }
        createdAt
        updatedAt
      }
      complete3LevelPluscode
      startingCoordinates {
        id
        lat
        lng
        createdAt
        updatedAt
      }
      finishCoordinates {
        id
        lat
        lng
        createdAt
        updatedAt
      }
      creatorName
      description
      title
      hashtags
      dificultyLevel
      verified
      lineCompleted
      elevationPoints
      latitudeDeltaFit
      longitudeDeltaFit
      distance
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCoordinates = /* GraphQL */ `
  subscription OnCreateCoordinates {
    onCreateCoordinates {
      id
      lat
      lng
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCoordinates = /* GraphQL */ `
  subscription OnUpdateCoordinates {
    onUpdateCoordinates {
      id
      lat
      lng
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCoordinates = /* GraphQL */ `
  subscription OnDeleteCoordinates {
    onDeleteCoordinates {
      id
      lat
      lng
      createdAt
      updatedAt
    }
  }
`;
