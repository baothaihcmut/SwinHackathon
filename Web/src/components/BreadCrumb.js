import React from 'react';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
const BreadCrumb = () => (
    <Breadcrumb
      items={[
        {
          href: ' ',
          title: <HomeOutlined />,
        },
        {
          href: 'https://bui-tung-hung.github.io/ProposalHackathon/?fbclid=IwY2xjawFihq9leHRuA2FlbQIxMAABHZUSYmnh86JUNP6T_rwGGoVmbdP73je9bXNQ6SCEM9s5Yu2g0mRr5anqFQ_aem_H7cfuIgOfMXfWgJkQj7Lxw',
          title: (
            <>
              <UserOutlined />
              <span>About Us</span>
            </>
          ),
        },
      ]}
    />
  );
  export default BreadCrumb;