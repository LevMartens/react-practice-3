/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBlog = /* GraphQL */ `
  query GetBlog($id: ID!) {
    getBlog(id: $id) {
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
export const listBlogs = /* GraphQL */ `
  query ListBlogs(
    $filter: ModelBlogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBlogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        postID
        post {
          id
          title
          blogID
          createdAt
          updatedAt
        }
        content
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLineDrafts = /* GraphQL */ `
  query GetLineDrafts($id: ID!) {
    getLineDrafts(id: $id) {
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
export const listLineDrafts = /* GraphQL */ `
  query ListLineDrafts(
    $filter: ModelLineDraftsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLineDrafts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getPlusCodeLevel1 = /* GraphQL */ `
  query GetPlusCodeLevel1($id: ID!) {
    getPlusCodeLevel1(id: $id) {
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
export const listPlusCodeLevel1s = /* GraphQL */ `
  query ListPlusCodeLevel1s(
    $filter: ModelPlusCodeLevel1FilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlusCodeLevel1s(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getPlusCodeLevel2 = /* GraphQL */ `
  query GetPlusCodeLevel2($id: ID!) {
    getPlusCodeLevel2(id: $id) {
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
export const listPlusCodeLevel2s = /* GraphQL */ `
  query ListPlusCodeLevel2s(
    $filter: ModelPlusCodeLevel2FilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlusCodeLevel2s(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getPlusCodeLevel3 = /* GraphQL */ `
  query GetPlusCodeLevel3($id: ID!) {
    getPlusCodeLevel3(id: $id) {
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
export const listPlusCodeLevel3s = /* GraphQL */ `
  query ListPlusCodeLevel3s(
    $filter: ModelPlusCodeLevel3FilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlusCodeLevel3s(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getLines = /* GraphQL */ `
  query GetLines($id: ID!) {
    getLines(id: $id) {
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
export const listLines = /* GraphQL */ `
  query ListLines(
    $filter: ModelLinesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLines(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        parentId
        pluscodeParent {
          id
          completePluscode
          parentIdWithDigits
          digits
          numberOfLines
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
      nextToken
    }
  }
`;
export const getCoordinates = /* GraphQL */ `
  query GetCoordinates($id: ID!) {
    getCoordinates(id: $id) {
      id
      lat
      lng
      createdAt
      updatedAt
    }
  }
`;
export const listCoordinates = /* GraphQL */ `
  query ListCoordinates(
    $filter: ModelCoordinatesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCoordinates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        lat
        lng
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const pluscodeByDigits = /* GraphQL */ `
  query PluscodeByDigits(
    $digits: String
    $sortDirection: ModelSortDirection
    $filter: ModelPlusCodeLevel1FilterInput
    $limit: Int
    $nextToken: String
  ) {
    pluscodeByDigits(
      digits: $digits
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const pluscode2ByDigitsAndParent = /* GraphQL */ `
  query Pluscode2ByDigitsAndParent(
    $parentIdWithDigits: String
    $sortDirection: ModelSortDirection
    $filter: ModelPlusCodeLevel2FilterInput
    $limit: Int
    $nextToken: String
  ) {
    pluscode2ByDigitsAndParent(
      parentIdWithDigits: $parentIdWithDigits
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const pluscode2ByCompletePluscode = /* GraphQL */ `
  query Pluscode2ByCompletePluscode(
    $completePluscode: String
    $sortDirection: ModelSortDirection
    $filter: ModelPlusCodeLevel2FilterInput
    $limit: Int
    $nextToken: String
  ) {
    pluscode2ByCompletePluscode(
      completePluscode: $completePluscode
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const pluscode3ByDigitsAndParent = /* GraphQL */ `
  query Pluscode3ByDigitsAndParent(
    $parentIdWithDigits: String
    $sortDirection: ModelSortDirection
    $filter: ModelPlusCodeLevel3FilterInput
    $limit: Int
    $nextToken: String
  ) {
    pluscode3ByDigitsAndParent(
      parentIdWithDigits: $parentIdWithDigits
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const pluscode3ByCompletePluscode = /* GraphQL */ `
  query Pluscode3ByCompletePluscode(
    $completePluscode: String
    $sortDirection: ModelSortDirection
    $filter: ModelPlusCodeLevel3FilterInput
    $limit: Int
    $nextToken: String
  ) {
    pluscode3ByCompletePluscode(
      completePluscode: $completePluscode
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const lineByCompletePluscodes = /* GraphQL */ `
  query LineByCompletePluscodes(
    $complete3LevelPluscode: String
    $sortDirection: ModelSortDirection
    $filter: ModelLinesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    lineByCompletePluscodes(
      complete3LevelPluscode: $complete3LevelPluscode
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        parentId
        pluscodeParent {
          id
          completePluscode
          parentIdWithDigits
          digits
          numberOfLines
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
      nextToken
    }
  }
`;
