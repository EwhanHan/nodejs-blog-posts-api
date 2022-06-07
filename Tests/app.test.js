const request = require('supertest');
const app = require('../app');

describe('get ping', () => {
  it('should ping with 200, message: success', async () => {
    const res = await request(app).get('/api/ping');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success');
    expect(res.body.success).toBe(true);
  });
});

describe('get blog post with tags=history,tech and sortBy=likes and direction=desc', () => {
  it('should return the posts with tags history and tech sorted by liked in descending order', async () => {
    const assessmentRes = await request(app).get(
      '/api/posts?tag=history,tech&sortBy=likes&direction=desc'
    );
    const solutionRes = await request(
      'https://api.hatchways.io/assessment/solution/'
    ).get('posts?tags=history,tech&sortBy=likes&direction=desc');
    expect(assessmentRes.statusCode).toEqual(200);
    expect(assessmentRes.body).toHaveProperty('posts');
    expect(assessmentRes.body.posts).toMatchObject(solutionRes.body.posts);
  });
});

describe('get blog posts', () => {
  it('should return an array', async () => {
    const res = await request(app).get(
      '/api/posts?tag=history,tech&sortBy=likes&direction=desc'
    );

    const postsSchema = {
      posts: expect.any(Array),
    };

    expect(res.body).toEqual(expect.objectContaining(postsSchema));
  });
});

describe('get blog posts', () => {
  it('should return an array with specific schema', async () => {
    const res = await request(app).get(
      '/api/posts?tag=history,tech&sortBy=likes&direction=desc'
    );

    const postsSchema = {
      id: expect.any(Number),
      author: expect.any(String),
      authorId: expect.any(Number),
      likes: expect.any(Number),
      popularity: expect.any(Number),
      reads: expect.any(Number),
      tags: expect.any(Array),
    };

    res.body.posts.map((post) => {
      expect(post).toEqual(expect.objectContaining(postsSchema));
    });
  });
});

describe('get blog posts with invalid sortBy', () => {
  it('should return  with status code 400 and error message: sortBy parameter is invalid', async () => {
    const res = await request(app).get('/api/posts?tag=test&sortBy=test');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('sortBy parameter is invalid');
  });
});

describe('get blog posts with invalid direction', () => {
  it('should return  with status code 400 and error message: direction parameter is invalid', async () => {
    const res = await request(app).get('/api/posts?tag=test&direction=test');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('direction parameter is invalid');
  });
});

describe('get blog posts with empty tags', () => {
  it('should return error message: tags parameter is missing', async () => {
    const res = await request(app).get('/api/posts?tag=');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Tags parameter is required');
  });
});
