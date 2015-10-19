var Metalsmith    = require('metalsmith'),
    jade          = require('metalsmith-jade'),
    markdown      = require('metalsmith-markdown'),
    layouts       = require('metalsmith-layouts'),
    place         = require('metalsmith-in-place'),
    collections   = require("metalsmith-collections"),
    htmlMinifier = require("metalsmith-html-minifier"),
    permalinks    = require("metalsmith-permalinks");


Metalsmith(__dirname)
    .use(jade())
    .use(markdown())
    .use(htmlMinifier())
    .use(layouts({
        "engine": "jade",
        "directory": "templates",
        "partials": "partials"
    }))
    .use(place({
        "engine": "jade",
        "partials": "partials"
    }))
    .use(collections({
        pages: {
            pattern: "pages/*.md"
        },
        posts: {
            pattern: "posts/*.md",
            sortyBy: "date",
            reverse: true
        }
    }))
    .use(permalinks({
        pattern: ":collection/:title"
    }))
    .destination('./build')
    .source('./src')
    .build()