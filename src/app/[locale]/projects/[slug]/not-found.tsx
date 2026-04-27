import Link from 'next/link';
import { Container } from '@/components/layout/container';

export default function ProjectNotFound() {
  return (
    <main className="flex-1 flex items-center justify-center py-32">
      <Container>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">404</p>
          <h1 className="mt-2 text-2xl font-medium text-foreground">Project not found</h1>
          <p className="mt-3 text-muted-foreground text-sm">
            This project doesn&apos;t exist or has been removed.
          </p>
          <div className="mt-6">
            <Link
              href="/#projects"
              className="text-sm text-accent hover:text-accent/80 transition-colors"
            >
              ← Back to projects
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
