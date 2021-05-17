const path = require("path")

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type ScansJson implements Node {
      id: ID!
    }

    type NodulesJson implements Node {
      id: ID!
    }
  `

  createTypes(typeDefs)
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const scanTemplate = path.resolve("src/templates/scan.js")
  const noduleTemplate = path.resolve("src/templates/nodule.js")

  const result = await graphql(`
    query {
      allScansJson {
        edges {
          node {
            id
          }
        }
      }
      allNodulesJson {
        edges {
          node {
            id
            scan {
              id
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild("Error while running scans query.")
    return
  }

  result.data.allScansJson.edges.forEach(({ node }) => {
    const id = node.id
    createPage({
      path: `/scans/${id}`,
      component: scanTemplate,
      context: {
        scanId: id,
      },
    })
  })
  result.data.allNodulesJson.edges.forEach(({ node }) => {
    const id = node.id
    const scanId = node.scan.id
    createPage({
      path: `/scans/${scanId}/nodules/${id}`,
      component: noduleTemplate,
      context: {
        noduleId: id,
      },
    })
  })
}
