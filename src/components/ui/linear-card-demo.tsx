import React from 'react'
import Component from '@/components/ui/linear-card'

const preview = {
  galleryNew: {
    src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  globe: {
    src: 'https://images.unsplash.com/photo-1632395627760-72e6eca7f9c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE5fHx0ZWNobm9sb2d5JTIwcGxhbmV0fGVufDB8fDB8fHww',
  },
  mousetrail: {
    src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1740&auto=format&fit=crop',
  },
}

const items = [
  {
    id: 1,
    url: preview.galleryNew,
    title: 'Accordion',
    description:
      'Immerse yourself in our cutting-edge interactive gallery, designed to showcase a diverse array of visual content with unparalleled clarity and style. This feature allows users to effortlessly navigate through high-resolution images, from awe-inspiring landscapes to intimate portraits and abstract art. With smooth transitions, intuitive controls, and responsive design, our gallery adapts to any device, ensuring a seamless browsing experience. Dive deeper into each piece with expandable information panels, offering insights into the artist, technique, and story behind each image. ',
    tags: ['Sunrise', 'Mountains', 'Golden', 'Scenic', 'Inspiring'],
  },
  {
    id: 2,
    url: preview.globe,
    title: 'Globe Section',
    description: `Embark on a virtual journey around the world with our state-of-the-art 3D globe feature. This interactive marvel allows users to explore geographical data, global trends, and worldwide connections with unprecedented ease and detail. Spin the globe with a flick of your mouse, zoom into street-level views, or soar high for a continental perspective. Our globe section integrates real-time data feeds, showcasing everything from climate patterns and population densities to economic indicators and cultural hotspots. Customizable layers let you focus on specific data sets, while intuitive tooltips provide in-depth information at every turn. `,
    tags: ['Misty', 'Path', 'Mysterious', 'Serene', 'Rugged'],
  },
  {
    id: 3,
    url: preview.mousetrail,
    title: 'Image Mouse Trail',
    description: `Transform your browsing experience with our mesmerizing Image Mouse Trail feature. As you move your cursor across the screen, watch in wonder as a trail of carefully curated images follows in its wake, creating a dynamic and engaging visual spectacle. This innovative feature goes beyond mere aesthetics; it's an interactive showcase of your content, products, or artwork. Each image in the trail can be clickable, leading to detailed views or related content, turning casual mouse movements into opportunities for discovery.`,
    tags: ['Pathway', 'Adventure', 'Peaks', 'Challenging', 'Breathtaking'],
  },
]

function ComponentDemo() {
  return (
    <div className="flex gap-4">
      <Component items={items} />
    </div>
  )
}

export { ComponentDemo as DemoOne }
