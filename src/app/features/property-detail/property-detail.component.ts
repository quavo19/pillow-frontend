import { Component, OnInit, inject } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { properties } from '../../core/data/property-data';

@Component({
  selector: 'app-property-detail',
  imports: [RouterLink],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css',
})
export class PropertyDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);
  private readonly router = inject(Router);
  readonly property = properties.find((item) => item.slug === this.route.snapshot.paramMap.get('slug'));
  readonly allImages = this.property ? [this.property.image, ...this.property.gallery] : [];
  isLoading = true;
  isContactOpen = false;
  isGalleryOpen = false;
  selectedImage = this.property?.image ?? '';

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 450);
  }

  formatPrice(price: number): string {
    return `GH₵${price.toLocaleString()}`;
  }

  get selectedImageIndex(): number {
    const index = this.allImages.indexOf(this.selectedImage);
    return index >= 0 ? index : 0;
  }

  openContact(): void {
    this.isContactOpen = true;
  }

  closeContact(): void {
    this.isContactOpen = false;
  }

  openGallery(): void {
    this.isGalleryOpen = true;
  }

  closeGallery(): void {
    this.isGalleryOpen = false;
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  navigateGallery(direction: 'previous' | 'next'): void {
    if (!this.allImages.length) {
      return;
    }

    const offset = direction === 'next' ? 1 : -1;
    const nextIndex = (this.selectedImageIndex + offset + this.allImages.length) % this.allImages.length;
    this.selectedImage = this.allImages[nextIndex];
  }

  goBack(): void {
    const hasSameOriginReferrer = document.referrer.startsWith(window.location.origin);
    const hasAngularHistory = Number(window.history.state?.navigationId ?? 1) > 1;

    if (hasSameOriginReferrer || hasAngularHistory) {
      this.location.back();
      return;
    }

    void this.router.navigate(['/']);
  }
}
