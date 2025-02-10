import type { Schema, Attribute } from '@strapi/strapi';

export interface LayoutHalalIndustriesSection extends Schema.Component {
  collectionName: 'components_layout_halal_industries_sections';
  info: {
    displayName: 'Halal Industries Section';
    description: '';
  };
  attributes: {
    subHeading: Attribute.String;
    Heading: Attribute.String;
    description: Attribute.Text;
    link: Attribute.Component<'components.link'>;
  };
}

export interface ComponentsLink extends Schema.Component {
  collectionName: 'components_components_links';
  info: {
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    text: Attribute.String;
    url: Attribute.String;
    isExternal: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface ComponentsCallToAction extends Schema.Component {
  collectionName: 'components_components_call_to_actions';
  info: {
    displayName: 'Call to Action';
  };
  attributes: {
    subHeading: Attribute.String;
    heading: Attribute.String;
    buttonText: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'layout.halal-industries-section': LayoutHalalIndustriesSection;
      'components.link': ComponentsLink;
      'components.call-to-action': ComponentsCallToAction;
    }
  }
}
