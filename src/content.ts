import { PageProps } from "@/components/Page"

type WebsiteProps = {
    title: string,
    subtitle?:string | null ,
    pages: { [key : string]: PageProps },
}

const Content: WebsiteProps = {
  "title": "Jegor van Opdorp",
  "subtitle":"Full-stack Developer with a Passion for Cloud and Hardware Simulations",
  "pages": {
    "/": {
      title: "Jodporp's website",
      subtitle: "Welcome, please feel free to browse around"
    },
    "/projects": {
      "title": "Projects",
      "subtitle": "A collection of all my projects, both personal & professional.",
      sections: [
        { 
          title: "Infrastructure",
          cards: [
            { 
              projectName: "Leafcloud", 
              projectDescription: "Sustainable cloud computing platform for A.I. and k8s. Built using OpenStack and Kubernetes.", 
              url: "#" 
            },
          ]
        },
        { 
          title:"Web Development", 
          cards :[
            { 
              projectName: "Detelefoongids.nl", 
              projectDescription: "Optimized directory search functionality...", 
              url: "#" 
            },
            { 
              projectName: "ANWB Autokosten",
              projectDescription: "Autokosten calculator for ANWB...",
              url: "#"
            },
            { 
              projectName: "Lilianvanopdorp.nl",
              projectDescription: "Portfolio website for artist Lilian van Opdorp...",
              url: "#"
            }
          ] 
        },
        {
          title:'Hardware and electronics',
          cards:[
              { 
              projectName: "FPGA Analog Simulation", 
              projectDescription: "Framework for simulating analog systems using FPGAs...", 
              url: "#" 
            }
          ]
        }
      ],
    }
  }
}

export default Content;