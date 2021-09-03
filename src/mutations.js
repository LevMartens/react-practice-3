/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBlog = /* GraphQL */ `
  mutation CreateBlog(
    $input: CreateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    createBlog(input: $input, condition: $condition) {
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
export const updateBlog = /* GraphQL */ `
  mutation UpdateBlog(
    $input: UpdateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    updateBlog(input: $input, condition: $condition) {
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
export const deleteBlog = /* GraphQL */ `
  mutation DeleteBlog(
    $input: DeleteBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    deleteBlog(input: $input, condition: $condition) {
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
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
export const createLineDrafts = /* GraphQL */ `
  mutation CreateLineDrafts(
    $input: CreateLineDraftsInput!
    $condition: ModelLineDraftsConditionInput
  ) {
    createLineDrafts(input: $input, condition: $condition) {
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
export const updateLineDrafts = /* GraphQL */ `
  mutation UpdateLineDrafts(
    $input: UpdateLineDraftsInput!
    $condition: ModelLineDraftsConditionInput
  ) {
    updateLineDrafts(input: $input, condition: $condition) {
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
export const deleteLineDrafts = /* GraphQL */ `
  mutation DeleteLineDrafts(
    $input: DeleteLineDraftsInput!
    $condition: ModelLineDraftsConditionInput
  ) {
    deleteLineDrafts(input: $input, condition: $condition) {
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
export const createPlusCodeLevel1 = /* GraphQL */ `
  mutation CreatePlusCodeLevel1(
    $input: CreatePlusCodeLevel1Input!
    $condition: ModelPlusCodeLevel1ConditionInput
  ) {
    createPlusCodeLevel1(input: $input, condition: $condition) {
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
export const updatePlusCodeLevel1 = /* GraphQL */ `
  mutation UpdatePlusCodeLevel1(
    $input: UpdatePlusCodeLevel1Input!
    $condition: ModelPlusCodeLevel1ConditionInput
  ) {
    updatePlusCodeLevel1(input: $input, condition: $condition) {
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
export const deletePlusCodeLevel1 = /* GraphQL */ `
  mutation DeletePlusCodeLevel1(
    $input: DeletePlusCodeLevel1Input!
    $condition: ModelPlusCodeLevel1ConditionInput
  ) {
    deletePlusCodeLevel1(input: $input, condition: $condition) {
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
export const createPlusCodeLevel2 = /* GraphQL */ `
  mutation CreatePlusCodeLevel2(
    $input: CreatePlusCodeLevel2Input!
    $condition: ModelPlusCodeLevel2ConditionInput
  ) {
    createPlusCodeLevel2(input: $input, condition: $condition) {
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
export const updatePlusCodeLevel2 = /* GraphQL */ `
  mutation UpdatePlusCodeLevel2(
    $input: UpdatePlusCodeLevel2Input!
    $condition: ModelPlusCodeLevel2ConditionInput
  ) {
    updatePlusCodeLevel2(input: $input, condition: $condition) {
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
export const deletePlusCodeLevel2 = /* GraphQL */ `
  mutation DeletePlusCodeLevel2(
    $input: DeletePlusCodeLevel2Input!
    $condition: ModelPlusCodeLevel2ConditionInput
  ) {
    deletePlusCodeLevel2(input: $input, condition: $condition) {
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
export const createPlusCodeLevel3 = /* GraphQL */ `
  mutation CreatePlusCodeLevel3(
    $input: CreatePlusCodeLevel3Input!
    $condition: ModelPlusCodeLevel3ConditionInput
  ) {
    createPlusCodeLevel3(input: $input, condition: $condition) {
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
export const updatePlusCodeLevel3 = /* GraphQL */ `
  mutation UpdatePlusCodeLevel3(
    $input: UpdatePlusCodeLevel3Input!
    $condition: ModelPlusCodeLevel3ConditionInput
  ) {
    updatePlusCodeLevel3(input: $input, condition: $condition) {
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
export const deletePlusCodeLevel3 = /* GraphQL */ `
  mutation DeletePlusCodeLevel3(
    $input: DeletePlusCodeLevel3Input!
    $condition: ModelPlusCodeLevel3ConditionInput
  ) {
    deletePlusCodeLevel3(input: $input, condition: $condition) {
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
export const createLines = /* GraphQL */ `
  mutation CreateLines(
    $input: CreateLinesInput!
    $condition: ModelLinesConditionInput
  ) {
    createLines(input: $input, condition: $condition) {
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
export const updateLines = /* GraphQL */ `
  mutation UpdateLines(
    $input: UpdateLinesInput!
    $condition: ModelLinesConditionInput
  ) {
    updateLines(input: $input, condition: $condition) {
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
export const deleteLines = /* GraphQL */ `
  mutation DeleteLines(
    $input: DeleteLinesInput!
    $condition: ModelLinesConditionInput
  ) {
    deleteLines(input: $input, condition: $condition) {
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
export const createCoordinates = /* GraphQL */ `
  mutation CreateCoordinates(
    $input: CreateCoordinatesInput!
    $condition: ModelCoordinatesConditionInput
  ) {
    createCoordinates(input: $input, condition: $condition) {
      id
      lat
      lng
      createdAt
      updatedAt
    }
  }
`;
export const updateCoordinates = /* GraphQL */ `
  mutation UpdateCoordinates(
    $input: UpdateCoordinatesInput!
    $condition: ModelCoordinatesConditionInput
  ) {
    updateCoordinates(input: $input, condition: $condition) {
      id
      lat
      lng
      createdAt
      updatedAt
    }
  }
`;
export const deleteCoordinates = /* GraphQL */ `
  mutation DeleteCoordinates(
    $input: DeleteCoordinatesInput!
    $condition: ModelCoordinatesConditionInput
  ) {
    deleteCoordinates(input: $input, condition: $condition) {
      id
      lat
      lng
      createdAt
      updatedAt
    }
  }
`;
