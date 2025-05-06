import { Heading, Row } from '@/shared';
import { useEffect } from 'react';
import { getCabins } from '@/shared';

export function Cabins() {
  useEffect(function () {
    getCabins().then((data) => console.log(data));
  }, []);
  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <img src="https://blytefrrzlpznkyszwiv.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg" />
    </Row>
  );
}
