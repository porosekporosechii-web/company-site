import { db } from '@/lib/db';
import { formatDate } from '@/lib/format';
import { ServiceHero } from '@/components/ServiceHero';
import { Feedback } from '@/components/Feedback';
import { BlogList } from '@/components/BlogList';

export default async function BlogPage() {
  const dbPosts = await db.post.findMany({
    where: { published: true },
    orderBy: { date: 'desc' },
  });

  const posts = dbPosts.map((p) => ({
    id: p.id,
    slug: p.slug,
    category: p.category,
    title: p.title,
    excerpt: p.excerpt,
    date: formatDate(p.date),
    readTime: p.readTime,
    featured: p.featured,
    coverImage: p.coverImage,
  }));

  const cats = Array.from(new Set(dbPosts.map((p) => p.category)));
  const categories = ['Все статьи', ...cats];

  return (
    <main>
      <ServiceHero
        title="Наш"
        highlight="блог"
        subtitle="Делимся опытом: наружная реклама, торговое оборудование, LED-экраны, декорации, текстильные лайтбоксы и решения для коммерческих пространств."
        tag="Статьи и советы"
        backgroundImage="/banner.png"
        breadcrumb={[
          { label: 'Главная', href: '/' },
          { label: 'Блог' },
        ]}
      />
      <BlogList posts={posts} categories={categories} />
      <Feedback />
    </main>
  );
}
