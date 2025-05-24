import { Anchor } from '@mantine/core';
import For from '../common/utils/For';
import Show from '../common/utils/Show';
import css from './channel-description.module.scss';

function transformDescription(description: string): string {
  const withAnchors = description.replace(
    /https?:\/\/[^\s]+/g,
    (url) =>
      `<a className="link" href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`,
  );
  const withBr = withAnchors.replace(/\n/g, '<br />');

  return withBr;
}

type ChannelDescriptionProps = {
  description: string;
  featuredUrls: string[];
};

export default function ChannelDescription({ description, featuredUrls }: ChannelDescriptionProps) {
  return (
    <div>
      <Show when={description.length > 0}>
        <p
          className={css.description}
          dangerouslySetInnerHTML={{
            __html: transformDescription(description),
          }}
        />
      </Show>
      <Show when={featuredUrls.length > 0}>
        <For each={featuredUrls}>
          {(url, index) => (
            <div key={`channel-description-featured-url-${index}`}>
              <Anchor href={url}>{url}</Anchor>
            </div>
          )}
        </For>
      </Show>
    </div>
  );
}
